/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';

import styles from './Media.module.scss';
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import { ReactComponent as ShareIcon } from 'assets/icons/share.svg';
import { isImage, isVideo } from 'utils/constants';
import Image from 'app/components/Image';
import { usePostReaction } from 'mutations/post_reaction';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

interface Props {
  media_url?: string;
  comment_count?: number;
  reaction_count?: number;
  share_count?: number;
  contents?: string;
  isReaction?: boolean;
  post_id?: string;
}
function Media(props: Props) {
  const {
    media_url = '',
    comment_count = 0,
    reaction_count = 0,
    share_count = 0,
    contents = 'ok',
    isReaction = false,
    post_id = '',
  } = props;

  const { t } = useTranslation();
  const [reacted, setReacted] = useState(() => {
    return isReaction;
  });
  const [totalReaction, setTotalReaction] = useState(() => {
    return reaction_count;
  });

  const postReaction = usePostReaction();

  const handlePostReaction = useCallback(() => {
    postReaction.mutate(
      { post_id, type: 'Like' },
      {
        onSuccess: data => {
          if (data?.unReaction) {
            setTotalReaction(pre => pre - 1);
            setReacted(false);
          } else {
            setTotalReaction(pre => pre + 1);
            setReacted(true);
          }
        },
      },
    );
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('mediaWrapper')}>
          {isVideo(media_url) && (
            <video className={cx('content', 'video')} controls src={media_url}>
              {t('text.notsupport')}
            </video>
          )}

          {isImage(media_url) ? (
            <Image className={cx('content', 'image')} src={media_url} />
          ) : (
            <p className={cx('content')}>{contents}</p>
          )}
        </div>
        <div className={cx('controls')}>
          <div className={cx('controlsItem')}>
            <span className={cx('iconWrapper')} onClick={handlePostReaction}>
              <HeartIcon className={cx('icon', { active: reacted })} />
            </span>
            <strong className={cx('quantity')}>{totalReaction}</strong>
          </div>
          <div className={cx('controlsItem')}>
            <span className={cx('iconWrapper')}>
              <CommentIcon className={cx('icon')} />
            </span>
            <strong className={cx('quantity')}>{comment_count}</strong>
          </div>
          <div className={cx('controlsItem')}>
            <span className={cx('iconWrapper')}>
              <ShareIcon className={cx('icon')} />
            </span>
            <strong className={cx('quantity')}>{share_count}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Media;
