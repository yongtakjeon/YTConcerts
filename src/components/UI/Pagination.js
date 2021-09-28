import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import paginationStyle from "./Pagination.module.css";

const Pagination = (props) => {

    const history = useHistory();
    const path = useLocation().pathname;
    const query = new URLSearchParams(useLocation().search);

    const totalElements = props.totalElements;
    const size = props.size;
    const city = props.city;
    const currentPage = props.pageNum + 1;

    const totalPage = Math.ceil(totalElements / size) > 50 ? 50 : Math.ceil(totalElements / size);


    /*
    -- pageGroup --
    groupStart: currentPage - 2
        -> can't be less than 1
        -> if groupEnd is equal to totalPage, groupStart always should be 'groupEnd - 6'
    groupEnd: currentPage + 4
        -> can't be more than 'totalPage'
        -> if groupStart is 1, groupEnd always should be 7
        -> if 'totalPage' is less than 8, groupEnd = totalPage
    */
    const pageGroup = [];
    let groupStart = currentPage - 2 < 1 ? 1 : currentPage - 2;
    let groupEnd;
    if (totalPage < 8) {
        groupEnd = totalPage;
    }
    else {
        if (groupStart === 1) {
            groupEnd = 7;
        }
        else {
            groupEnd = currentPage + 4 > totalPage ? totalPage : currentPage + 4;
        }
    }

    if (groupEnd === totalPage) {
        groupStart = groupEnd - 6 < 1 ? 1 : groupEnd - 6;
    }

    for (let i = groupStart; i <= groupEnd; i++) {
        pageGroup.push(i);
    }

    const setPageNum = ((pageNumber) => {
        query.set('page', pageNumber);
        history.push(path + "?" + query.toString());
    });

    return (
        <div className={paginationStyle.pagination}>
            {
                city ?
                    <span onClick={() => setPageNum(currentPage-2 < 0 ? 0:currentPage-2)} className={`${paginationStyle.pageNum} ${paginationStyle.arrow}`}>❮</span>
                    :
                    <span onClick={() => setPageNum(currentPage-2 < 0 ? 0:currentPage-2)} className={`${paginationStyle.pageNum} ${paginationStyle.arrow}`}>❮</span>
            }

            {
                totalPage <= 7 &&
                pageGroup.map((pageNum, index) => {

                    return city ?
                        <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                        :
                        <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                })
            }


            {
                totalPage > 7 && groupStart === 1 &&
                <span>
                    {
                        pageGroup.map((pageNum, index) => {

                            return city ?
                                <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                                :
                                <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                        })
                    }
                    <span> ... </span>
                    {
                        city ?
                            <span onClick={() => setPageNum(totalPage - 1)} className={paginationStyle.pageNum}>{totalPage}</span>
                            :
                            <span onClick={() => setPageNum(totalPage - 1)} className={paginationStyle.pageNum}>{totalPage}</span>
                    }
                </span>
            }


            {
                groupStart !== 1 && groupEnd !== totalPage &&
                <span>
                    {
                        city ?
                            <span onClick={() => setPageNum(0)} className={paginationStyle.pageNum}>1</span>
                            :
                            <span onClick={() => setPageNum(0)} className={paginationStyle.pageNum}>1</span>
                    }
                    <span> ... </span>
                    {
                        pageGroup.map((pageNum, index) => {

                            return city ?
                                <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                                :
                                <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                        })
                    }
                    <span> ... </span>
                    {
                        city ?
                            <span onClick={() => setPageNum(totalPage - 1)} className={paginationStyle.pageNum}>{totalPage}</span>
                            :
                            <span onClick={() => setPageNum(totalPage - 1)} className={paginationStyle.pageNum}>{totalPage}</span>
                    }
                </span>
            }


            {
                groupStart !== 1 && groupEnd === totalPage &&
                <span>
                    {
                        city ?
                            <span onClick={() => setPageNum(0)} className={paginationStyle.pageNum}>1</span>
                            :
                            <span onClick={() => setPageNum(0)} className={paginationStyle.pageNum}>1</span>
                    }
                    <span> ... </span>
                    {
                        pageGroup.map((pageNum, index) => {

                            return city ?
                                <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                                :
                                <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                        })
                    }
                </span>
            }


            {
                city ?
                    <span onClick={() => setPageNum(currentPage > totalPage-1 ? totalPage-1 : currentPage)} className={`${paginationStyle.pageNum} ${paginationStyle.arrow}`}>❯</span>
                    :
                    <span onClick={() => setPageNum(currentPage > totalPage-1 ? totalPage-1 : currentPage)} className={`${paginationStyle.pageNum} ${paginationStyle.arrow}`}>❯</span>
            }
        </div>

    );
};

export default Pagination;