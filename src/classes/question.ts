export default class Question {
    id: number = -1;
    disabled: boolean = false;
    question: string = "";
    presenter: string = "";
    options: string[] = [];
    answerIx: number = -1;
}