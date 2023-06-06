import Sequelize from "sequelize";
   import { dbconn } from '../config';
   
   export const Albums = dbconn.sequelize.define(
    "albums",
    {
          AlbumId: {
        type:  Sequelize.STRING, 
				primaryKey:true, 
				autoIncrement: true,
        },
          Title: {
        type:  Sequelize.STRING,  
        },
          ArtistId: {
        type:  Sequelize.STRING,  
        },
       }); 