import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixIndex = async () => {
  try {
    // Підключення до бази даних
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Підключено до MongoDB');
    
    // Отримуємо колекцію users
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // Видаляємо індекс username якщо він існує
    try {
      await usersCollection.dropIndex('username_1');
      console.log('Індекс username_1 успішно видалено');
    } catch (error) {
      if (error.code === 27) {
        console.log('Індекс username_1 не існує');
      } else {
        console.error('Помилка при видаленні індексу:', error.message);
      }
    }
    
    // Видаляємо поле username з усіх документів
    const result = await usersCollection.updateMany(
      {},
      { $unset: { username: "" } }
    );
    
    console.log(`Видалено поле username з ${result.modifiedCount} документів`);
    
    console.log('Міграція завершена успішно');
    
  } catch (error) {
    console.error('Помилка:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Відключено від MongoDB');
  }
};

fixIndex(); 