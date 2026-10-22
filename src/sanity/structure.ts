import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('FinAid Hub')
    .items([
      S.listItem().title('Active articles').child(S.documentTypeList('post').title('Active articles').filter('_type == "post" && archived != true')),
      S.listItem().title('Drafts').child(S.documentTypeList('post').title('Drafts').filter('_type == "post" && _id in path("drafts.**")')),
      S.listItem().title('Featured articles').child(S.documentTypeList('post').title('Featured articles').filter('_type == "post" && featured == true && archived != true')),
      S.listItem().title('Review due').child(S.documentTypeList('post').title('Review due').filter('_type == "post" && archived != true && defined(reviewDueAt) && reviewDueAt <= string::split(now(), "T")[0]')),
      S.listItem().title('Needs sources').child(S.documentTypeList('post').title('Needs sources').filter('_type == "post" && archived != true && (!defined(sources) || count(sources) == 0)')),
      S.listItem().title('Archived articles').child(S.documentTypeList('post').title('Archived articles').filter('_type == "post" && archived == true')),
      S.divider(),
      S.documentTypeListItem('resource').title('Useful resources'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
    ])
