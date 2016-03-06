using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.DTOs.Converters;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Requests;
using BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Responses;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Models;
using BetterWays.Api.BoundedContexts.CoachingCourses.Core.Services;
using BetterWays.Api.BoundedContexts.CoachingCourses.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace BetterWays.Api.Bounded_Contexts.CoachingCourses.Infrastructure.Controllers
{
    public class ResourceController : ApiController
    {
        // GET api/values
        public IEnumerable<ModuleResourceDTO> Get()
        {
            //TODO: Find user 
            var resourceRepository = new ModuleResourceRepositoryDocumentDb();
            return resourceRepository.GetAllItems().Select(c => ModuleResourceDTOConverter.ConvertToDTO(c));
        }

        // GET api/values/5
        public ModuleResourceDTO Get(Guid id)
        {
            var resourceRepository = new ModuleResourceRepositoryDocumentDb();
            return ModuleResourceDTOConverter.ConvertToDTO(
                resourceRepository.GetItems(i => i.Id == id).SingleOrDefault());
        }

        // PUT api/values
        public UpdateModuleResourceResponse Put(UpdateModuleResourceRequest request)
        {
            var coachingCourseRepository = new CoachingCourseRepositoryDocumentDB();
            var coachingModuleResourceRepository = new ModuleResourceRepositoryDocumentDb();
            var coachingModuleRepository = new CoachingModuleRepositoryDocumentDB();

            var module = coachingModuleRepository.GetModuleById(request.ModuleId);
            var resource = coachingModuleResourceRepository.GetResourceById(request.ResourceId);

            var coachingService = new CoachingCourseService(coachingCourseRepository, coachingModuleResourceRepository, coachingModuleRepository);
            
            var newResource = coachingService.UpdateModuleResurce(module, 
                new CoachingModuleResourceReference( resource.Id, resource.RevisionHistory.ReferenceId), request.UpdatedContent);

            return new UpdateModuleResourceResponse() { UpdatedResouceId = newResource.Id, UpdatedResouceVersion = newResource.Version, ParentResourceId = request.ResourceId };
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}