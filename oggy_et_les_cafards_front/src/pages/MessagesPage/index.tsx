import React, { useState, useEffect, useMemo } from 'react';
import { Match } from '../../types/Match';
import { User } from '../../types/User';
import { Message } from '../../types/Message';
import { chatService } from '../../services/chatService';
import { userService } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';
import './style.css';

const MessagesPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [usersCache, setUsersCache] = useState<Record<string, User>>({});
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      chatService.getMatches(currentUser.id).then(async (result) => {
        const userMatches = result as Match[];
        setMatches(userMatches);
        const userIds = new Set(userMatches.flatMap((m: Match) => m.userIds));
        const fetchedUsers: Record<string, User> = {};
        for (const userId of Array.from(userIds)) {
          if (!usersCache[userId]) {
            const user = await userService.getUser(userId);
            if (user) fetchedUsers[userId] = user;
          }
        }
        setUsersCache(prev => ({ ...prev, ...fetchedUsers }));
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedMatch) {
      chatService.getMessages(selectedMatch.id).then((messages) => setConversation(messages as Message[]));
    } else {
      setConversation([]);
    }
  }, [selectedMatch]);

  const otherUser = useMemo(() => {
    if (!selectedMatch || !currentUser) return null;
    const otherUserId = selectedMatch.userIds.find(id => id !== currentUser.id);
    return otherUserId ? usersCache[otherUserId] : null;
  }, [selectedMatch, currentUser, usersCache]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !otherUser || !newMessage.trim()) return;

    const sentMessage = await chatService.sendMessage(currentUser.id, otherUser.id, newMessage);
    setConversation(prev => [...prev, sentMessage]);
    setNewMessage('');
  };

  if (!currentUser) {
    return <p>Please log in to see your messages.</p>
  }

  return (
    <div className="messages-container">
      <div className="match-list">
        <h2>Matches</h2>
        {matches.map(match => {
          const matchUser = match.userIds.find(id => id !== currentUser.id);
          const user = matchUser ? usersCache[matchUser] : null;

          if (!user) return <div key={match.id} className="match-item loading">Loading...</div>;
          
          return (
            <div 
              key={match.id} 
              className={`match-item ${selectedMatch?.id === match.id ? 'selected' : ''}`}
              onClick={() => setSelectedMatch(match)}
            >
              <img src={user.profile.photo} alt={user.profile.name} />
              <p>{user.profile.name}</p>
            </div>
          );
        })}
      </div>
      <div className="chat-window">
        {selectedMatch && otherUser ? (
          <>
            <h2>Chat with {otherUser.profile.name}</h2>
            <div className="message-list">
              {conversation.map(msg => (
                <div key={msg.id} className={`message ${msg.senderId === currentUser.id ? 'sent' : 'received'}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <form className="message-input" onSubmit={handleSendMessage}>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <h3>Welcome, {currentUser.profile.name}!</h3>
            <p>Select a match to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage; 