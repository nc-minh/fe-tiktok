/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { detectLoginActions } from 'app/components/ProfileHeaderBase/slice';

import { routeConfig } from 'app/routes/routeConfig';
import styles from './Header.module.scss';
import tiktokLogo from 'assets/images/tiktokLogo.svg';
import Button from 'app/components/Button';
import Menu from 'app/containers/Menu';
import Image from 'app/components/Image';
import { ReactComponent as InboxIcon } from 'assets/icons/inbox.svg';
import { ReactComponent as MessageIcon } from 'assets/icons/message.svg';
import { ReactComponent as LanguageIcon } from 'assets/icons/english.svg';
import { ReactComponent as QuestionIcon } from 'assets/icons/question.svg';
import { ReactComponent as KeyboardIcon } from 'assets/icons/keyboard.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as GetCoinIcon } from 'assets/icons/getCoin.svg';
import { ReactComponent as SettingIcon } from 'assets/icons/setting.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg';
import { ReactComponent as MoreIcon } from 'assets/icons/more.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import SearchBar from 'app/components/SearchBar';
import { MenuItemType } from 'types/Menu';
import { useSearchUsers } from 'queries/users';
import { useDebounce } from 'app/hooks';
import DialogCustomize from 'app/components/DialogCustomize';
import PopupContent from 'app/components/PopupContent';
import PopupLogin from 'app/containers/PopupLogin';
import PopupSignup from 'app/containers/PopupSignup';
import { getUserData, removeItemFromStorage } from 'utils/storage';
import { UserInfo } from 'types/User';
import { RootState } from 'stores';

const cx = classNames.bind(styles);

interface Props {
  className?: string;
}

function Header({ className = '' }: Props) {
  const { t } = useTranslation();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const classes = cx('inner', {
    [className]: className,
  });
  const [textSearch, setTextSearch] = useState('');
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [tabLogin, setTabLogin] = useState(true);

  const debouncedValue = useDebounce(textSearch, 500);

  const { username, _id } = getUserData();

  const MENU_ITEMS: MenuItemType[] = [
    {
      icon: <LanguageIcon />,
      title: 'English',
      children: {
        title: 'Language',
        data: [
          {
            code: 'en',
            title: 'English',
          },
          {
            code: 'vi',
            title: 'Tieng Viet',
          },
        ],
      },
    },
    {
      icon: <QuestionIcon />,
      title: 'Feedback and Help',
      to: '/feedback',
    },
    {
      icon: <KeyboardIcon />,
      title: 'Keyboard shortcuts',
    },
  ];
  const currentUser: UserInfo = useMemo(() => {
    if (getUserData()?.username) {
      // dispath(reloadAvatarActions.reloadAvatar(false));
      return getUserData();
    } else {
      removeItemFromStorage('tokens');
      return null;
    }
  }, []);

  const USER_MENU: MenuItemType[] = [
    {
      icon: <UserIcon />,
      title: 'View profile',
      to: `/@${username}`,
    },
    {
      icon: <GetCoinIcon />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <SettingIcon />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <LogoutIcon />,
      title: 'Log out',
      separate: true,
    },
  ];

  const { data: searchUsersResults, isFetching } = useSearchUsers(
    {
      q: debouncedValue.trim(),
      type: 'less',
    },
    isActive,
  );

  const handleChangeSearch = useCallback(
    (event: any) => {
      const { type, keyCode } = event;

      const searchValue = event.target.value;

      if (type === 'keydown' && keyCode === 13) {
        setTextSearch(event.target.value);
      }

      if (!searchValue.startsWith(' ')) {
        setTextSearch(searchValue);
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    },
    [setTextSearch, textSearch],
  );

  const handleClearSearch = useCallback(
    (event: any) => {
      setTextSearch('');
      setTooltipIsOpen(false);
    },
    [setTextSearch, textSearch],
  );

  const handleOnFocus = useCallback(() => {}, []);

  const handleOnBlur = useCallback(() => {
    setTimeout(() => {
      setTooltipIsOpen(false);
    }, 200);
  }, [isFetching]);

  const handleOnCloseDialog = useCallback(() => {
    setIsLogin(false);
    setTabLogin(true);
  }, [setIsLogin, isLogin]);

  const handleSwitchLoginTab = useCallback(() => {
    setTabLogin(!tabLogin);
  }, [tabLogin, setTabLogin]);

  const detectLogin: any = useSelector(
    (state: RootState) => state.detectLogin.detectLogin,
  );

  useEffect(() => {
    if (detectLogin) {
      setIsLogin(true);
      dispath(detectLoginActions.detectLogin(false));
    }
  }, [detectLogin]);

  const onUpload = useCallback(() => {
    if (_id) {
      console.log('upload ne``');

      navigate('/upload');
    } else {
      console.log('hong duoc upload ne`');
      dispath(detectLoginActions.detectLogin(true));
    }
  }, [_id, detectLogin]);

  return (
    <header className={cx('wrapper')}>
      <div className={classes}>
        <Link to={routeConfig.home} className={cx('logo')}>
          <Image src={tiktokLogo} alt="tiktok logo" />
        </Link>

        <SearchBar
          autoFocus={false}
          value={textSearch}
          placeHolder={t('placeHolder')}
          onChange={handleChangeSearch}
          onClear={handleClearSearch}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          tooltipIsOpen={tooltipIsOpen && searchUsersResults?.length > 0}
          onClick={() => setTooltipIsOpen(true)}
          listResults={searchUsersResults}
          loading={isFetching ? true : false}
        />
        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Button onClick={onUpload} box className={cx('upload')}>
                <PlusIcon className={cx('uploadIcon')} />
                Upload
              </Button>
              <Tooltip arrow title="Message" placement="bottom">
                <span className={cx('action-btn')}>
                  <MessageIcon />
                </span>
              </Tooltip>
              <Tooltip arrow title="Inbox" placement="bottom">
                <span className={cx('action-btn')}>
                  <InboxIcon />
                  <span className={cx('badge')}>12</span>
                </span>
              </Tooltip>
            </>
          ) : (
            <>
              <Button onClick={onUpload} box className={cx('upload')}>
                <PlusIcon className={cx('uploadIcon')} />
                Upload
              </Button>
              <Button onClick={() => setIsLogin(true)} primary>
                Login
              </Button>
            </>
          )}

          <Menu items={currentUser ? USER_MENU : MENU_ITEMS}>
            {currentUser ? (
              <Image
                className={cx('user-avatar')}
                src={currentUser.avatar}
                alt="avatar"
              />
            ) : (
              <span className={cx('more-btn')}>
                <MoreIcon />
              </span>
            )}
          </Menu>
        </div>
      </div>
      <DialogCustomize open={isLogin} onClose={handleOnCloseDialog}>
        <PopupContent
          onClose={handleOnCloseDialog}
          footerContent={
            tabLogin ? "Don't have an account?" : 'Already have an account?'
          }
          linkContent={tabLogin ? 'Sign up' : 'Log in'}
          onClick={handleSwitchLoginTab}
        >
          {tabLogin ? <PopupLogin /> : <PopupSignup />}
        </PopupContent>
      </DialogCustomize>
    </header>
  );
}

export default Header;
