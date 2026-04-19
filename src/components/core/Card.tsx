import Spinner from './Spinner';

type CardProps = {
  title: string;
  error?: Error | null;
  loading?: boolean;
  children: React.ReactNode;
  status?: React.ReactNode;
};

const Card = (props: CardProps) => {
  const { title, children, status, loading, error } = props;

  return (
    <div className="tm-card">
      <div className="tm-card-header">
        <h3 className="uppercase text-muted">{title}</h3>
        {status}
      </div>

      {loading ? (
        <div className="text-center p-8">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-error text-center">
          We couldn't load the data. Please try again in a moment.
          <br />
          Error: {error.message}
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-5 pb-5">{children}</div>
      )}
    </div>
  );
};
export default Card;
