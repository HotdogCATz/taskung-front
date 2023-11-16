// pages/[user_id]/project/[project_id].js

import ProjectDetails from '/components/projects/ProjectDetails';
import Head from 'next/head';

function Projects() {

    return (
        <>
            <Head>
                <title>Taskung - Project</title>
                <meta
                    name="Taskung"
                    key="desc"
                />
            </Head>
            <main>
                <div>
                    <ProjectDetails />
                </div>
            </main>
        </>
    )
}
export default Projects