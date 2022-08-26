/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames/bind';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'app/components/Button';
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
import CommentItem from 'app/components/CommentItem';
import { PostInfoType } from 'types/Post';
import { UserInfo } from 'types/User';
import { useGetCommentOfPost } from 'queries/comment';
import Input from 'app/components/Input';
import { useCreateComment } from 'mutations/comment';
import { detectLoginActions } from 'app/components/ProfileHeaderBase/slice';
import { RootState } from 'stores';
import { useViewPost } from 'mutations/post';

const cx = classNames.bind(styles);

interface Props {
  postInfo: PostInfoType;
  userOfPost: UserInfo;
}

function MediaDetailContent({ postInfo, userOfPost }: Props) {
  const pathName = window.location.href;
  const navigate = useNavigate();
  const dispath = useDispatch();

  const [textValue, setTextValue] = useState('');
  const [isOpenComment, setIsOpenComment] = useState(false);

  const { data: GetCommentOfPost, refetch } = useGetCommentOfPost(
    postInfo?._id,
    true,
  );

  const detectLogin: any = useSelector(
    (state: RootState) => state.detectLogin.detectLogin,
  );

  const createComment = useCreateComment();

  window.onpopstate = () => {
    navigate(`/@${userOfPost?.username}`);
  };

  const handleCreateComment = useCallback(() => {
    createComment.mutate(
      {
        contents: textValue,
        post_id: postInfo?._id,
      },
      {
        onSuccess: data => {
          console.log('onSuccess', data);
          refetch();
          setTextValue('');
        },
        onError: (error: any) => {
          if (error?.name === 'AuthenticationError') {
            console.log('onError', error);
            dispath(detectLoginActions.detectLogin(false));
          }
        },
      },
    );
  }, [textValue]);

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        console.log('onKeyDown', textValue);
        handleCreateComment();
      }
    },
    [textValue],
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTextValue(e.target.value);
    },
    [textValue, setTextValue],
  );

  const handleShowLoginPopup = useCallback(() => {
    dispath(detectLoginActions.detectLogin(true));
  }, [detectLogin]);

  const userLogin: any = useSelector((state: RootState) => state.getUser.user);

  useEffect(() => {
    if (userLogin?.username) {
      setIsOpenComment(true);
    } else {
      setIsOpenComment(false);
    }
  }, [userLogin]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header className={cx('header')}>
          <div className={cx('userInfo')}>
            <div className={cx('imageWrapper')}>
              <Image className={cx('image')} src={userOfPost?.avatar} />
            </div>
            <div className={cx('infoWrapper')}>
              <h3 className={cx('username')}>{userOfPost?.username}</h3>
              <strong className={cx('fullname')}>{userOfPost?.fullname}</strong>
            </div>
            <Button className={cx('actionBtn')} outline>
              Follow
            </Button>
          </div>
          <main className={cx('videoDesc')}>{postInfo?.contents}</main>
          <div className={cx('interactive')}>
            <div className={cx('InteractiveLeft')}>
              <div className={cx('actionBtnWrapper')}>
                <div className={cx('actionIconWrapper')}>
                  <HeartIcon
                    className={cx(
                      'actionIcon',
                      postInfo?.isReaction[0]?._id && 'isReaction',
                    )}
                  />
                </div>
                <strong className={cx('actionCount')}>
                  {postInfo?.reaction_count || 0}
                </strong>
              </div>
              <div className={cx('actionBtnWrapper')}>
                <div className={cx('actionIconWrapper')}>
                  <CommentIcon className={cx('actionIcon')} />
                </div>
                <strong className={cx('actionCount')}>
                  {postInfo?.comment_count || 0}
                </strong>
              </div>
            </div>
            <div className={cx('InteractiveRight')}>
              <Tooltip title="Embed" arrow placement="top">
                <EmbedIcon className={cx('icon')} />
              </Tooltip>
              <Tooltip title="Send to friends" arrow placement="top">
                <SendIcon className={cx('icon')} />
              </Tooltip>
              <Tooltip title="Share to Facebook" arrow placement="top">
                <FacebookIcon className={cx('icon')} />
              </Tooltip>
              <Tooltip title="Share to WhatsApp" arrow placement="top">
                <WhatsappIcon className={cx('icon')} />
              </Tooltip>
              <Tooltip title="Share to WhatsApp" arrow placement="top">
                <TwitterIcon className={cx('icon')} />
              </Tooltip>
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
            {GetCommentOfPost &&
              GetCommentOfPost.map((item, index: number) => (
                <CommentItem key={index} commentInfo={item} />
              ))}
          </div>
        </main>

        <div className={cx('commentInput')}>
          {isOpenComment ? (
            <div className={cx('commentInputWrapper')}>
              <div className={cx('commentInputAction')}>
                <Input
                  placeholder="Add comment..."
                  type="text"
                  className={cx('input')}
                  onKeyDown={handleOnKeyDown}
                  value={textValue}
                  onChange={handleOnChange}
                />
                <div className={cx('iconWrapper')}>
                  <MentionIcon className={cx('icon')} />
                </div>
                <div className={cx('iconWrapper')}>
                  <EmojiIcon className={cx('icon')} />
                </div>
              </div>
              <Button
                loading={createComment.isLoading}
                onClick={handleCreateComment}
                className={cx('cmtBtn')}
              >
                Post
              </Button>
            </div>
          ) : (
            <div onClick={handleShowLoginPopup} className={cx('plsLogin')}>
              Please log in to comment
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(MediaDetailContent);
