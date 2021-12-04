import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import paginationStyle from "./Pagination.module.css";

const Pagination = (props) => {

    const history = useHistory();
    const path = useLocation().pathname;
    const query = new URLSearchParams(useLocation().search);

    const totalElements = props.totalElements; // total number of concerts
    const size = props.size; // number of concerts per a page
    const currentPage = props.pageNum + 1;

    // We can get the number of total page with 'totalElements' and 'size',
    // and according to Ticketmaster API policy, (totalPage * size) must be less than 1,000,
    // so maximum totalPage is set to 50.
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

    // push the page numbers to the pageGroup array
    for (let i = groupStart; i <= groupEnd; i++) {
        pageGroup.push(i);
    }


    // This function will be executed when one of the page numbers is clicked.
    const setPageNum = ((pageNumber) => {
        query.set('page', pageNumber);
        history.push(path + "?" + query.toString());
    });


    return (
        <div className={paginationStyle.pagination}>
            <span onClick={() => setPageNum(currentPage - 2 < 0 ? 0 : currentPage - 2)} className={`${paginationStyle.pageNum} ${paginationStyle.arrow}`}>❮</span>

            {/* === 1 - when totalPage is less than 8 === */}
            {
                totalPage <= 7 &&
                pageGroup.map((pageNum, index) => {
                    return <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                })
            }

            {/* === 2 - when totalPage is greater than 7, and groupStart is 1 === */}
            {
                totalPage > 7 && groupStart === 1 &&
                <span>
                    {
                        pageGroup.map((pageNum, index) => {
                            return <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                        })
                    }
                    <span> ... </span>
                    <span onClick={() => setPageNum(totalPage - 1)} className={paginationStyle.pageNum}>{totalPage}</span>
                </span>
            }

            {/* === 3 - when groupStart is not 1, and groupEnd is not equal to totalPage === */}
            {
                groupStart !== 1 && groupEnd !== totalPage &&
                <span>
                    <span onClick={() => setPageNum(0)} className={paginationStyle.pageNum}>1</span>
                    <span> ... </span>
                    {
                        pageGroup.map((pageNum, index) => {

                            return <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                        })
                    }
                    <span> ... </span>
                    <span onClick={() => setPageNum(totalPage - 1)} className={paginationStyle.pageNum}>{totalPage}</span>
                </span>
            }

            {/* === 4 - when groupStart is not 1, and groupEnd is equal to totalPage === */}
            {
                groupStart !== 1 && groupEnd === totalPage &&
                <span>
                    <span onClick={() => setPageNum(0)} className={paginationStyle.pageNum}>1</span>
                    <span> ... </span>
                    {
                        pageGroup.map((pageNum, index) => {

                            return <span key={index} onClick={() => setPageNum(groupStart - 1 + index)} className={`${paginationStyle.pageNum} ${pageNum === currentPage ? paginationStyle.selected : ''}`}>{pageNum}</span>
                        })
                    }
                </span>
            }


            <span onClick={() => setPageNum(currentPage > totalPage - 1 ? totalPage - 1 : currentPage)} className={`${paginationStyle.pageNum} ${paginationStyle.arrow}`}>❯</span>
        </div>

    );
};

export default Pagination;