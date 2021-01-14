import { prisma } from '../../../../generated/prisma-client';
import { generateSecret, sendSecretMail } from '../../../utils';

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {

      const { email } = args;
      const loginSecret  = generateSecret();
      try {
        await prisma.updateUser({ data: { loginSecret }, where: { email }});
        await sendSecretMail(email, loginSecret);
        return true;
      } catch(error)  {
        return false
      }
    }
  }
};