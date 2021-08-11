import React from 'react'

export default function Pagination(props) {
    const fetchPage = props.fetchPage
    const links = props.links

    return (
        <nav className="" aria-label="Page navigation example">
            <ul className="pagination">

                {
                    links?.map((link, index) => {
                        if (link['url'] && index == 0) {
                            return <button key={index} className="page-link" onClick={() => fetchPage(link['url'])}>السابق</button>
                        }
                        if (link['url'] && index == links.length - 1) {
                            return <button key={index} className="page-link" onClick={() => fetchPage(link['url'])}>التالي</button>
                        }
                        if (link['url'] && index && index != links.length - 1)
                            return <button key={index} className="page-link" onClick={() => fetchPage(link['url'])}>{link['label']}</button>
                    })
                }

            </ul>
        </nav>
    )
}