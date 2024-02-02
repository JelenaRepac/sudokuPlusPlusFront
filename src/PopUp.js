import Swal from 'sweetalert2';


export const serverError = (error) =>{
    Swal.fire({
        icon:"error",
        title: "NOT CONNECTED",
        text:error,
        width: 550,
        background: `url('https://img.freepik.com/free-vector/abstract-horizontal-grid-lines-graph-style-graphic-design_1017-39918.jpg?size=626&ext=jpg&ga=GA1.1.34264412.1706745600&semt=ais')`,
        padding: "15px",
        timer: 1500,
        customClass: {
          title: 'pop-up',
        },
        showConfirmButton: false,
      });
}