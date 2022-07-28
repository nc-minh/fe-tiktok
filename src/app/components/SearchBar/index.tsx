import { InputBase, Tooltip } from '@mui/material';
import { RefObject, useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './SearchBar.module.scss';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as SpinnerIcon } from 'assets/icons/spinner.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import AccountItem from '../AccountItem';
import { UserInfo } from 'types/User';

const cx = classNames.bind(styles);

interface TooltipResultProps {
  searchResults: UserInfo[];
}

const TooltipResult = ({ searchResults }: TooltipResultProps) => {
  return (
    <div className={cx('search-result')}>
      <div className={cx('tooltipResult__wrapper')}>
        <h4 className={cx('search-title')}>Accounts</h4>
        {searchResults.map((result, index) => (
          <AccountItem key={index} userInfo={result} />
        ))}
      </div>
    </div>
  );
};

interface Props {
  autoFocus?: boolean;
  onChange?: (event: any) => any;
  onClear?: (event: any) => any;
  isDisabled?: boolean;
  onSubmit?: () => void;
  searchInputRef?: RefObject<HTMLInputElement>;
  value?: string;
  onBlur?: () => any;
  onFocus?: () => void;
  className?: string;
  placeHolder?: string;
  loading?: boolean;
  tooltipIsOpen?: boolean;
  listResults?: UserInfo[];
}

function SearchBar(props: Props) {
  const {
    autoFocus = true,
    onChange = () => {},
    onClear = () => {},
    isDisabled,
    searchInputRef,
    value = '',
    onBlur = () => {},
    onFocus = () => {},
    onSubmit = () => {},
    placeHolder = '',
    loading = false,
    tooltipIsOpen = false,
    listResults = [],
  } = props;

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.code === 'Enter' && onSubmit) onSubmit();
      onChange(e);
    },
    [onSubmit],
  );

  const handleInputFocus = useCallback(() => {
    if (onFocus) onFocus();
  }, [onFocus]);

  const handleInputBlur = useCallback(() => {
    if (onBlur) onBlur();
  }, [onBlur]);

  return (
    <Tooltip
      classes={{ tooltip: cx('tooltip'), popper: cx('popper') }}
      open={tooltipIsOpen}
      enterDelay={50}
      leaveDelay={150}
      title={<TooltipResult searchResults={listResults} />}
      placement="bottom-start"
    >
      <div className={cx('wrapper')}>
        <InputBase
          autoComplete="off"
          autoFocus={autoFocus}
          className={cx('search')}
          disabled={isDisabled}
          inputRef={searchInputRef}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          value={value}
          placeholder={placeHolder}
        />
        {value.length > 0 && (
          <CloseIcon className={cx('closeIcon')} onClick={onClear} />
        )}
        {loading && <SpinnerIcon className={cx('loading', 'closeIcon')} />}

        <button
          className={cx('search-btn')}
          onMouseDown={e => e.preventDefault()}
        >
          <SearchIcon />
        </button>
      </div>
    </Tooltip>
  );
}

export default SearchBar;
