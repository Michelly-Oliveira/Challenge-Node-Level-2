import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

// Instanciate the repo class
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // Call the repo to list all the transactions
    const transactions = transactionsRepository.all();
    // Call the repo to get the balance of the account
    const balance = transactionsRepository.getBalance();

    const account = {
      transactions,
      balance,
    };

    return response.json(account);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // Destructure the data received from user
    const { title, value, type } = request.body;

    // Initialize service to create a new transaction, pass the transactions repo so the service can have access to data/methods
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // Call the service to create a transaction passing the required data
    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    // Return the newly created transaction
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
