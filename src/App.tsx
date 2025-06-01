import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun, Menu, X, Sparkles } from 'lucide-react';
import EditorPane from './components/editor/EditorPane';
import PreviewPane from './components/preview/PreviewPane';
import useResumeStore from './store/useResumeStore';
import Footer from './components/ui/Footer';

function App() {
  const { darkMode, toggleDarkMode } = useResumeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePane, setActivePane] = useState<'editor' | 'preview'>('editor');

  return (
    <div className={`min-h-screen flex flex-col dark-theme-gradient transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800/80 dark:backdrop-blur-sm shadow-md px-4 py-3 md:px-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 dark-theme-glow flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-6 h-6" />
            ResumeForge
          </motion.h1>
          
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              onClick={() => toggleDarkMode()}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
              <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-transparent dark:via-white/5 dark:to-transparent dark:animate-shimmer" />
            </motion.button>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-800/90 dark:backdrop-blur-sm shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 space-y-2">
              <button
                onClick={() => {
                  setActivePane('editor');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activePane === 'editor' 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => {
                  setActivePane('preview');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  activePane === 'preview' 
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => {
                  toggleDarkMode();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
              >
                {darkMode ? (
                  <>
                    <Sun size={16} className="mr-2 text-yellow-400" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={16} className="mr-2" />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row">
        <div className={`${activePane === 'editor' ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5 overflow-y-auto p-4`}>
          <EditorPane />
        </div>
        <div className={`${activePane === 'preview' ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-3/5 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800/50`}>
          <PreviewPane />
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800/80 dark:backdrop-blur-sm shadow-lg-up flex z-10">
        <button
          onClick={() => setActivePane('editor')}
          className={`flex-1 py-3 transition-colors ${
            activePane === 'editor' 
              ? 'text-indigo-600 border-t-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setActivePane('preview')}
          className={`flex-1 py-3 transition-colors ${
            activePane === 'preview' 
              ? 'text-indigo-600 border-t-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;