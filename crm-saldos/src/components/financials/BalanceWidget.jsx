import { Card, CardContent, Typography, Stack } from '@mui/material';
import { useFirestore } from '../../hooks/useFirestore';

const BalanceWidget = () => {
  const { getDocuments } = useFirestore();
  const [balance, setBalance] = useState({ income: 0, expenses: 0 });

  useEffect(() => {
    const loadBalance = async () => {
      const transactions = await getDocuments('TRANSACTIONS');
      const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      setBalance({ income, expenses, total: income - expenses });
    };
    loadBalance();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Balance General</Typography>
        <Stack spacing={1}>
          <Typography>Ingresos: ${balance.income.toFixed(2)}</Typography>
          <Typography>Egresos: ${balance.expenses.toFixed(2)}</Typography>
          <Typography variant="h6" color={balance.total >= 0 ? 'success.main' : 'error.main'}>
            Total: ${balance.total.toFixed(2)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BalanceWidget;