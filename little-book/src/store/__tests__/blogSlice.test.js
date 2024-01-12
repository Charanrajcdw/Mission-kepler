import blogSlice, { blogActions } from "../slices/blogSlice";

describe("blog slice", () => {
  const blogsData = [
    { title: "title1", type: "type1" },
    { title: "title2", type: "type2" },
    { title: "title3", type: "type3" },
  ];
  const blogTypes = ["type1", "type2", "type3"];

  it("should modify initial blogs data", () => {
    const initialState = {
      blogData: [],
      blogTypes: [],
      filteredBlogData: [],
      selectedBlogTypes: [],
      currentBlog: {},
      isLoaded: false,
      isEditing: false,
      isWarningVisible: false,
      searchTerm: "",
    };
    const updatedState = blogSlice.reducer(initialState, blogActions.modifyBlogs(blogsData));
    expect(updatedState).toEqual({
      ...initialState,
      blogData: blogsData,
      filteredBlogData: blogsData,
      blogTypes: blogTypes,
      selectedBlogTypes: blogTypes,
      currentBlog: blogsData[0],
      isLoaded: true,
    });
  });

  it("should modify blog types", () => {
    const initialState = {
      blogData: blogsData,
      blogTypes: blogTypes,
      filteredBlogData: blogsData,
      selectedBlogTypes: blogTypes,
      currentBlog: blogsData[0],
      isLoaded: true,
      isEditing: false,
      isWarningVisible: false,
      searchTerm: "",
    };
    const updatedState = blogSlice.reducer(initialState, blogActions.modifyTypes("type1"));
    expect(updatedState).toEqual({
      ...initialState,
      selectedBlogTypes: ["type2", "type3"],
      currentBlog: blogsData[1],
      filteredBlogData: blogsData.slice(1),
    });
  });

  it("should modify current blog", () => {
    const initialState = {
      blogData: blogsData,
      blogTypes: blogTypes,
      filteredBlogData: blogsData,
      selectedBlogTypes: blogTypes,
      currentBlog: blogsData[0],
      isLoaded: true,
      isEditing: false,
      isWarningVisible: false,
      searchTerm: "",
    };
    const updatedState = blogSlice.reducer(initialState, blogActions.modifyCurrentBlog(blogsData[1]));
    expect(updatedState).toEqual({ ...initialState, currentBlog: blogsData[1] });
  });

  it("should modify search term", () => {
    const initialState = {
      blogData: blogsData,
      blogTypes: blogTypes,
      filteredBlogData: blogsData,
      selectedBlogTypes: blogTypes,
      currentBlog: blogsData[0],
      isLoaded: true,
      isEditing: false,
      isWarningVisible: false,
      searchTerm: "",
    };
    const updatedState = blogSlice.reducer(initialState, blogActions.modifySearchTerm("title5"));
    expect(updatedState).toEqual({
      ...initialState,
      searchTerm: "title5",
      filteredBlogData: [],
      currentBlog: null,
    });
  });

  it("should add new blog", () => {
    const initialState = {
      blogData: blogsData,
      blogTypes: blogTypes,
      filteredBlogData: blogsData,
      selectedBlogTypes: blogTypes,
      currentBlog: blogsData[0],
      isLoaded: true,
      isEditing: false,
      isWarningVisible: false,
      searchTerm: "",
    };
    const newBlog = { title: "title4", type: "type4" };
    const updatedState = blogSlice.reducer(initialState, blogActions.addNewBlog(newBlog));
    expect(updatedState).toEqual({
      ...initialState,
      blogData: [newBlog, ...blogsData],
      currentBlog: { ...newBlog },
      blogTypes: [...blogTypes, "type4"],
      selectedBlogTypes: [...blogTypes, "type4"],
      filteredBlogData: [newBlog, ...blogsData],
    });
  });

  it("should modify edit status", () => {
    const initialState = {
      blogData: blogsData,
      blogTypes: blogTypes,
      filteredBlogData: blogsData,
      selectedBlogTypes: blogTypes,
      currentBlog: blogsData[0],
      isLoaded: true,
      isEditing: false,
      isWarningVisible: false,
      searchTerm: "",
    };
    const updatedState = blogSlice.reducer(initialState, blogActions.modifyEditStatus(true));
    expect(updatedState).toEqual({ ...initialState, isEditing: true });
  });

  it("should edit existing blog", () => {
    const initialState = {
      blogData: blogsData,
      blogTypes: blogTypes,
      filteredBlogData: blogsData,
      selectedBlogTypes: blogTypes,
      currentBlog: blogsData[0],
      isLoaded: true,
      isEditing: false,
      isWarningVisible: false,
      searchTerm: "",
    };
    const editedBlog = { title: "new title", details: "new details", type: "type1" };
    const updatedState = blogSlice.reducer(initialState, blogActions.editExistingBlog(editedBlog));
    const updatedBlogsData = [editedBlog, ...blogsData.slice(1)];
    expect(updatedState).toEqual({
      ...initialState,
      blogData: updatedBlogsData,
      currentBlog: editedBlog,
      filteredBlogData: updatedBlogsData,
    });
  });
});
