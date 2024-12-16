// export class CustomError extends Error {
//   code: number | string;

//   constructor({ message, code }: { message: string; code: number | string }) {
//     super(message);
//     this.code = code;
//     this.name = this.constructor.name;
//   }

//   toJSON() {
//     return {
//       message: this.message,
//       code: this.code,
//     };
//   }
// }

// module.exports = CustomError;

// utils/CustomError.ts
export class CustomError extends Error {
  code: number | string;

  constructor({ message, code }: { message: string; code: number | string }) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}
