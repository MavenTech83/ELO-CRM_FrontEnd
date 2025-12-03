import Layout from "../../components/layout/Layout"

function Home() {
  return (
    <>
    <Layout>

		<div className="flex-1  transition-all duration-300">
			<div className="flex flex-col p-2">
				<div>
				<div className="grid grid-cols-2 p-1 gap-2 w-full">
						<section className="bg-white/20 h-[40vh]  rounded-4xl p-3">Exemplo area 1 </section>
						<section className="bg-white/20 h-[40vh] rounded-4xl p-3">Exemplo area 2</section>
				</div>
				</div>
				<div className="pt-1">
					<section className="bg-white/20 min-h-[40vh] rounded-4xl p-3">Exemplo area 3</section>
				</div>
			</div>

		</div>
    </Layout>
    </>
     
  )
}

export default Home

