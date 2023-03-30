import React from 'react'
import Filter from '../components/Filter';
import Header from '../components/Header';

function Home() {
    return (
        <>
            <div className="bg-white">
                <Header />

                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <Filter/>
                </div>
            </div>
        </>
    )
}

export default Home