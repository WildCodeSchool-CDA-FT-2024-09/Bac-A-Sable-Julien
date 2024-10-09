import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { LightRepo, Repo } from "../entities/repo";
import { Status } from "../entities/status";
// import { Language } from "../entities/language";
// import { FindOperator, In } from "typeorm";

@InputType()
class RepoInput implements Partial<Repo> {
  @Field()
  id: number;

  @Field()
  url: string;

  @Field()
  name: string;

  @Field()
  isPrivate: number;

  @Field()
  idGit: string;

  // @Field()
  // languages: [Language]
}

@Resolver(Repo)
export default class RepoResolver {


  // Methode GET pour tous les repos
  @Query(() => [Repo])
  async GetAllRepo() {
    const repos = await Repo.find({
      relations: {
        status: true,
        languages: true,
      },
    });
    console.info(repos);
    return repos;
  }


  @Query(() => [Repo])
  async getAllReposFilter(@Arg("filter", { nullable: true }) filter: string) {
      if (filter) {
          return await Repo.find({
              where: {
                  languages: {
                      label: String(filter),
                  },
              },
              relations: { languages: true, status: true }, // Assurez-vous que la relation "languages" est incluse
          });
      }
      return await Repo.find({
          relations: { languages: true, status: true }, // Relations avec languages et status
      });
  }


  @Query(() => [LightRepo])
  async lightrepos() {
    const repos = await Repo.find();
    // console.info(repos);
    return repos;
  }

  @Query(() => [Repo])
  async reposWithLanguages() {
    return await Repo.find({ relations: ["languages"] }); // Récupère les dépôts avec leurs langages
  }


@Query(() => LightRepo, { nullable: true })
async lightrepoById(@Arg("id", () => ID) id: number) {
  const repo = await Repo.findOne({
    where: { id },
    select: ["id", "name", "url", "isFavorite"],
  });

  if (!repo) {
    throw new Error(`Repo with id ${id} not found`);
  }
  console.log('%c⧭', 'color: #735656', repo);
  return repo;

}


@Mutation(() => Repo)
async createNewRepo(@Arg("data") newRepo: RepoInput) {
  console.info(newRepo);
  const repo = new Repo();

  repo.id = newRepo.id;
  repo.idGit = newRepo.idGit;
  repo.name = newRepo.name;
  repo.url = newRepo.url;

  const status = await Status.findOneOrFail({
    where: { id: +newRepo.isPrivate },
  });
  repo.status = status;

  await repo.save();
  console.log("repo", repo);
  const myRepo = await Repo.findOneOrFail({
    where: { id: newRepo.id },
    relations: {
      languages: true,
      status: true,
    },
  });
  console.log("myRepo", myRepo);
  return myRepo;
}
} 