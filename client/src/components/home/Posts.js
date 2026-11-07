import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../PostCard';
import LoadIcon from '../../images/loading.gif';
import LoadMoreBtn from '../LoadMoreBtn';
import { getDataAPI } from '../../utils/fetchData';
import { POST_TYPES } from '../../redux/actions/postAction';

const Posts = ({ filters = [] }) => {
    const { homePosts, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    // Si filters tiene results (búsqueda), usar esos; si no, homePosts.posts
    const postsToDisplay = Array.isArray(filters) && filters.length > 0 
        ? filters 
        : homePosts.posts

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: { ...res.data, page: homePosts.page + 1 },
        })
        setLoad(false)
    }

    return (
        <div>
            <div className="post_thumb">
                {postsToDisplay.length === 0 && (
                    <div className="text-center py-4">
                        <p>Aucun voyage ne correspond à votre recherche.</p>
                    </div>
                )}
                {postsToDisplay.map(post => (
                    <PostCard key={post._id} post={post} theme={theme} />
                ))}
                {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}
            </div>
            {(!filters || filters.length === 0) && (
                <LoadMoreBtn
                    result={homePosts.result}
                    page={homePosts.page}
                    load={load}
                    handleLoadMore={handleLoadMore}
                />
            )}
        </div>
    )
}

export default Posts;