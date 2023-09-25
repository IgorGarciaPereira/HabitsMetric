export interface IChallengeCreate {
  name: string;
  created_at: string;
  target_date: string;
}

export interface IChallenge extends IChallengeCreate {
  id: number;
  completed: boolean;
  completed_at: string;
}

export interface IItemList extends IChallenge{
  handleDelete: (id: number) => void;
  handlePress: () => void;
}