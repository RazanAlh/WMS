import { Question } from './question';

export class Survey {
    id: number;
    workshopid: number;
    title: string;
    notes: string;
    questions: Question[];
}

