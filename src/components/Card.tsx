import type {ReactNode} from 'react';

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div className="border p-4 rounded shadow my-2">
      {children}
    </div>
  );
};

export default Card;
