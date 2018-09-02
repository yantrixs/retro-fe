import { BoardsModule } from './boards.module';

describe('BoardsModule', () => {
  let boardsModule: BoardsModule;

  beforeEach(() => {
    boardsModule = new BoardsModule();
  });

  it('should create an instance', () => {
    expect(boardsModule).toBeTruthy();
  });
});
