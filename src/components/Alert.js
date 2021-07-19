import { useSelector } from 'react-redux';
import classNames from 'classnames';

const Alert = () => {
  const alerts = useSelector(state => state.alert);

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
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
