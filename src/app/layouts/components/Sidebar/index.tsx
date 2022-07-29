import classNames from 'classnames/bind';
import { routeConfig } from 'app/routes/routeConfig';
import Menu, { MenuItem } from './Menu';

import styles from './Sidebar.module.scss';
import { ReactComponent as HomeIcon } from 'assets/icons/home.svg';
import { ReactComponent as HomeActiveIcon } from 'assets/icons/homeActive.svg';
import { ReactComponent as UserGroupIcon } from 'assets/icons/userGroup.svg';
import { ReactComponent as UserGroupActiveIcon } from 'assets/icons/userGroupActive.svg';
import { ReactComponent as LiveIcon } from 'assets/icons/live.svg';
import { ReactComponent as LiveActiveIcon } from 'assets/icons/liveActive.svg';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <span>
          <MenuItem
            title="For You"
            to={routeConfig.home}
            icon={<HomeIcon />}
            activeIcon={<HomeActiveIcon />}
          />
          <MenuItem
            title="Following"
            to={routeConfig.following}
            icon={<UserGroupIcon />}
            activeIcon={<UserGroupActiveIcon />}
          />
          <MenuItem
            title="LIVE"
            to={routeConfig.live}
            icon={<LiveIcon />}
            activeIcon={<LiveActiveIcon />}
          />
        </span>
      </Menu>
    </aside>
  );
}

export default Sidebar;
