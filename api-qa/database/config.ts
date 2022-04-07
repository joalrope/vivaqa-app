import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.DB_CNN}`, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      /*  useCreateIndex: true, */
    });

    /* mongoose.set('useFindAndModify', false); */
    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error al inicializar DB');
  }
};
