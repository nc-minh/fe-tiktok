import Button from 'app/components/Button';
import classNames from 'classnames/bind';

import styles from './MediaDetailContent.module.scss';
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/comment.svg';
import { ReactComponent as EmbedIcon } from 'assets/icons/embed.svg';
import { ReactComponent as SendIcon } from 'assets/icons/send.svg';
import { ReactComponent as FacebookIcon } from 'assets/icons/socialNetwork/facebook.svg';
import { ReactComponent as WhatsappIcon } from 'assets/icons/socialNetwork/whatsapp.svg';
import { ReactComponent as TwitterIcon } from 'assets/icons/socialNetwork/twitter.svg';
import { ReactComponent as ShareIcon } from 'assets/icons/share.svg';
import { ReactComponent as MentionIcon } from 'assets/icons/mention.svg';
import { ReactComponent as EmojiIcon } from 'assets/icons/emoji.svg';
import Image from 'app/components/Image';
import { CommentInfoType } from 'types/Comment';
import CommentItem from 'app/components/CommentItem';
import { PostInfoType } from 'types/Post';

const cx = classNames.bind(styles);

interface Props {
  postInfo: PostInfoType;
}

function MediaDetailContent({ postInfo }: Props) {
  const pathName = window.location.href;

  const test: CommentInfoType[] = [
    {
      avatar: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
      fullname: 'Minh',
      username: 'nc-minh',
      comment_reaction_count: 2134,
      contents: 'day la cmt test',
      created_at: new Date('2022-07-15T08:38:42.950Z'),
    },
    {
      avatar: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
      fullname: 'Minh',
      username: 'nc-minh',
      comment_reaction_count: 2134,
      contents: 'day la cmt test',
      created_at: new Date('2022-07-15T08:38:42.950Z'),
    },
    {
      avatar: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
      fullname: 'Chi',
      username: 'nc-chi',
      comment_reaction_count: 54,
      contents: 'day la cmt test',
      created_at: new Date('2022-07-15T08:38:42.950Z'),
    },
    {
      avatar: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
      fullname: 'VU',
      username: 'nc-vu',
      comment_reaction_count: 345,
      contents: 'day la cmt test',
      created_at: new Date('2022-07-15T08:38:42.950Z'),
    },
    {
      avatar: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg',
      fullname: 'Tinh',
      username: 'nc-tinh',
      comment_reaction_count: 4,
      contents: 'day la cmt test',
      created_at: new Date('2022-07-15T08:38:42.950Z'),
    },
  ];
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header className={cx('header')}>
          <div className={cx('userInfo')}>
            <div className={cx('imageWrapper')}>
              <Image
                className={cx('image')}
                src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg"
              />
            </div>
            <div className={cx('infoWrapper')}>
              <h3 className={cx('username')}>{postInfo.user_id.username}</h3>
              <strong className={cx('fullname')}>
                {postInfo.user_id.fullname}
              </strong>
            </div>
            <Button className={cx('actionBtn')} outline>
              Follow
            </Button>
          </div>
          <main className={cx('videoDesc')}>{postInfo.contents}</main>
          <div className={cx('interactive')}>
            <div className={cx('InteractiveLeft')}>
              <div className={cx('actionBtnWrapper')}>
                <div className={cx('actionIconWrapper')}>
                  <HeartIcon className={cx('actionIcon')} />
                </div>
                <strong className={cx('actionCount')}>
                  {postInfo.reaction_count}
                </strong>
              </div>
              <div className={cx('actionBtnWrapper')}>
                <div className={cx('actionIconWrapper')}>
                  <CommentIcon className={cx('actionIcon')} />
                </div>
                <strong className={cx('actionCount')}>
                  {postInfo.comment_count}
                </strong>
              </div>
            </div>
            <div className={cx('InteractiveRight')}>
              <EmbedIcon className={cx('icon')} />
              <SendIcon className={cx('icon')} />
              <FacebookIcon className={cx('icon')} />
              <WhatsappIcon className={cx('icon')} />
              <TwitterIcon className={cx('icon')} />
              <ShareIcon className={cx('icon')} />
            </div>
          </div>
          <div className={cx('copyLink')}>
            <div className={cx('link')}>{pathName}</div>
            <div className={cx('copyBtn')}>Copy link</div>
          </div>
        </header>

        <main className={cx('commentContainer')}>
          <div className={cx('commentWrapper')}>
            {test &&
              test.map((item, index: number) => (
                <CommentItem key={index} commentInfo={item} />
              ))}
          </div>
        </main>

        <div className={cx('commentInput')}>
          <div className={cx('commentInputWrapper')}>
            <div className={cx('commentInputAction')}>
              <input
                placeholder="Add comment..."
                className={cx('input')}
                type="text"
              />
              <div className={cx('iconWrapper')}>
                <MentionIcon className={cx('icon')} />
              </div>
              <div className={cx('iconWrapper')}>
                <EmojiIcon className={cx('icon')} />
              </div>
            </div>
            <button className={cx('cmtBtn')}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaDetailContent;
