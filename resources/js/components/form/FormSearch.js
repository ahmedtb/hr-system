import React, { useState } from 'react';
import ReactDOM from 'react-dom';


function FormSearch(props) {

    const inputs = (JSON.parse(props.inputs))
    const formRoute = props.formRoute
    console.log(inputs)
    return (

        <form method="POST" action={formRoute} acceptCharset="UTF-8">
            <input type="hidden" name="_token" value={csrf_token} />

            <ul class="list-group">
                

                <li class="list-group-item">
                    <input type="submit" value="بحث" />
                </li>

            </ul>

        </form>

    );
}

export default FormSearch;

if (document.getElementById('FormSearch')) {
    var inputs = document.getElementById('FormSearch').getAttribute('inputs');
    var formRoute = document.getElementById('FormSearch').getAttribute('formRoute');
    ReactDOM.render(<FormSearch
        inputs={inputs} formRoute={formRoute}
    />, document.getElementById('FormSearch'));
}
