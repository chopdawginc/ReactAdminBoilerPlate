export class CustomError extends Error {
   code: number | string;

   constructor({ message, code }: { message: string; code: number | string }) {
      super(message);
      this.code = code;
      this.name = this.constructor.name;
   }

   toJSON() {
      return {
         message: this.message,
         code: this.code,
      };
   }
}
