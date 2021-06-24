import React from 'react';

export default function CustomRatingField(props) {
    const type = props.type
    const field = props.value
    const index = props.index
    const onChange = props.onChange

    let stars = []
    for (let i = 0; i < field['max']; i++) {
        stars[i] = <span class="fa fa-star"></span>
    }

    if (type == 'render')
        return (
            <>
                custom rating {field['label']}
                <div class='row'>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    {stars}
                </div>
            </>
        );
}
