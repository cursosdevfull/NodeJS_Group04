export interface IDatabaseBootstrap {
  initialize(): Promise<any>;
  getConnection(): any;
}

export class DatabaseBootstrap implements IDatabaseBootstrap {
  async initialize() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });

    await promise;
  }

  getConnection(): any {}
}
