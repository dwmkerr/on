const expect = require('chai').expect;
const validateArgs = require('./validate-args');

describe('validate-args', () => {
  it('should throw if args is not provided', () => {
    expect(() => validateArgs()).to.throw(/args/);
  });

  it('should throw if args.env is not provided', () => {
    expect(() => validateArgs({ })).to.throw(/env/);
  });

  it('should throw if args.commands is not provided', () => {
    expect(() => validateArgs({ env: 'dev' })).to.throw(/commands/);
  });
});
