import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import useResumeStore, { SocialPlatform } from '../../../store/useResumeStore';

const SocialLinksForm: React.FC = () => {
  const { socialLinks, addSocialLink, updateSocialLink, removeSocialLink } = useResumeStore();
  const [platform, setPlatform] = useState<SocialPlatform>('linkedin');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');

  const handleAdd = () => {
    if (!url) return;
    
    addSocialLink(platform, url, username);
    setPlatform('linkedin');
    setUrl('');
    setUsername('');
  };

  const platformOptions: { value: SocialPlatform; label: string }[] = [
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'github', label: 'GitHub' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'leetcode', label: 'LeetCode' },
    { value: 'hackerrank', label: 'HackerRank' },
    { value: 'blog', label: 'Blog' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-4">Social Links</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-1">
          <label className="form-label">Platform</label>
          <select 
            value={platform}
            onChange={(e) => setPlatform(e.target.value as SocialPlatform)}
            className="form-select"
          >
            {platformOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-span-1">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            placeholder="username"
          />
        </div>
        
        <div className="col-span-1">
          <label className="form-label">URL</label>
          <div className="flex">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="form-input rounded-r-none"
              placeholder="https://..."
            />
            <button
              onClick={handleAdd}
              className="btn btn-primary rounded-l-none px-3"
              title="Add Link"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {socialLinks.length > 0 ? (
        <div className="space-y-2">
          {socialLinks.map((link) => (
            <motion.div 
              key={link.id}
              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex-1">
                <span className="font-medium mr-2">{link.platform}:</span>
                <span className="text-gray-600 dark:text-gray-300">{link.username || link.url}</span>
              </div>
              <button
                onClick={() => removeSocialLink(link.id)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Remove Link"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
          No social links added yet. Add your first link above.
        </p>
      )}
    </motion.div>
  );
};

export default SocialLinksForm;