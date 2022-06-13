import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ item, onClick }) {
  const classes = cx('menu-item', {
    separate: item.separate,
  });
  return (
    <Button className={classes} leftIcon={item.icon} to={item.to} onClick={onClick}>
      {item.title}
    </Button>
  );
}

MenuItem.propsData = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MenuItem;
