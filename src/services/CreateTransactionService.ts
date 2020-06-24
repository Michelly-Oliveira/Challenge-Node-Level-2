import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  // Defining type of private variable
  private transactionsRepository: TransactionsRepository;

  // Initialize variable with instance of repo class
  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // Check if type is outcome, if it is only create new transaction if the total of the balance is bigger than the value of the transaction to be created
    if (type === 'outcome') {
      const totalOfAccount = this.transactionsRepository.getBalance().total;

      if (totalOfAccount < value) {
        throw Error('Cannot complete transaction of type outcome');
      }
    }

    // Call the repo to create a new transaction using the model
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    // Return the transaction created by the repo
    return transaction;
  }
}

export default CreateTransactionService;
