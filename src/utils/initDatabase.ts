import { ContentService } from '../services/contentService';

export const initializeDatabase = async () => {
  try {
    console.log('Initializing database with default content...');
    await ContentService.initializeDefaultContent();
    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
