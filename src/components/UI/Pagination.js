import classes from "./Pagination.module.css";

const Pagination = (props) => {

    const totalElements = 309;
    const size = 20;

    let currentPage = 1;
    const totalPage = Math.ceil(totalElements / size);

    /*
    시작 숫자: current - 2 (3보다 작으면 1)
    끝 숫자: current + 4 (총 페이지보다 크면 안됨)
    */

    let startNum = currentPage < 3 ? 1 : (currentPage - 2);
    console.log(startNum);
    let endNum = currentPage > totalPage ? totalPage : currentPage + 4;
    console.log(endNum);
    const leftGroup = [];
    for (let i = startNum; i <= endNum; i++) {
        leftGroup.push(i);
    }
    console.log(leftGroup);

    return(
        <div className={classes.pagination}>
            {
                leftGroup.map((pageNum) => {


                    return <span className={`${classes.pageNum} ${pageNum===currentPage? classes.selected:''}`}>{pageNum}</span>
                })
            }
            <span>...</span>
            <span className={classes.pageNum}>{totalPage}</span>
        </div>
    );
};

export default Pagination;

// number: 0
// size: 20
// totalElements: 309
// totalPages: 16

/*

전체갯수
한페이지에 몇개 표시할건지

현재 페이지

*/