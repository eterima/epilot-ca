import { Document, model, Schema } from 'mongoose';
import { User } from 'src/modules/user/database/mongodb/user.mongodb.schema';

export interface PlayerGuess {
  guess: number;
  isWin: boolean;
  playerId: Schema.Types.ObjectId;
  btcValue: number;
  btcValueAfter: number;
  player?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PlayerGuessDocument = Document & PlayerGuess;

const playerGuessSchema = new Schema<PlayerGuess>(
  {
    guess: { type: Number, required: true },
    // Value before guess
    btcValue: { type: Number, required: true },
    // Value after guess
    btcValueAfter: { type: Number, required: true },
    isWin: { type: Boolean, default: false },
    playerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

playerGuessSchema.virtual('player', {
  ref: 'User',
  localField: 'playerId',
  foreignField: '_id',
  justOne: true,
});

export const PlayerGuessModel = model<PlayerGuessDocument>(
  'Player-guess',
  playerGuessSchema,
);
