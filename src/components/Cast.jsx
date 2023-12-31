import React from "react";
import { useSelector } from "react-redux";

import "./cast.scss";

import ContentWrapper from "./ContentWrapper";
import Img from "./imageLoadingLazy";
import avatar from "../assets/Moviex-images/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {
                            data?.map((c)=>{
                                   let imgUrl=(c?.profile_path)?(url.profile+c?.profile_path)
                                   :(avatar)
                                return <div key={c.id}
                                className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>

                                    <div className="name">{c?.name}</div>

                                    <div className="character">{c?.character}</div>
                                </div>
                            })
                        }
                    </div>
                 
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>)
                }
             
            </ContentWrapper>
        </div>
    );
};

export default Cast;