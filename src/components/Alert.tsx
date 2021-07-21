import { useTypedSelector } from '../hooks/useTypedSelector';
import classNames from 'classnames';

const Alert: any = () => {
  const alerts = useTypedSelector(state => state.alert);

  interface AlertType {
    alertType: string;
    id: number;
    msg: string;
  }

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert: AlertType) => (
      <div
        className={classNames('alert', {
          red: alert.alertType === 'failure',
        })}
        key={alert.id}
      >
        {alert.msg}
      </div>
    ))
  );
};

export default Alert;
