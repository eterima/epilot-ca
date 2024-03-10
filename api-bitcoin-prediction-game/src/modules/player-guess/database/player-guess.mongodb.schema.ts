import { Document, model, Schema } from 'mongoose';
import { User } from 'src/modules/user/database/mongodb/user.mongodb.schema';

export interface PlayerGuess {
  guess: number;
  completed: boolean;
  scheduledAt: Date;
  playerId: Schema.Types.ObjectId;
  player?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PlayerGuessDocument = Document & PlayerGuess;

const playerGuessSchema = new Schema<PlayerGuess>(
  {
    guess: { type: Number, required: true },
    completed: { type: Boolean, default: false },
    scheduledAt: { type: Date },
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
