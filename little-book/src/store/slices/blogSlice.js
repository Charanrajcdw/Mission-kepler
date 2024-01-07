import { createSlice } from "@reduxjs/toolkit";

const filterData = (blogs, filters, searchTerm) => {
  return blogs.filter((blog) => filters.includes(blog.type.toLowerCase()) && blog.title.toLowerCase().includes(searchTerm.toLowerCase()));
};

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogData: [],
    blogTypes: [],
    filteredBlogData: [],
    selectedBlogTypes: [],
    currentBlog: {},
    isLoaded: false,
    isEditing: false,
    searchTerm: "",
  },
  reducers: {
    modifyBlogs(state, action) {
      state.blogData = action.payload;
      state.filteredBlogData = action.payload;
      let blogTypes = action.payload.map((blog) => blog.type.toLowerCase());
      blogTypes = [...new Set(blogTypes)];
      state.blogTypes = blogTypes;
      state.selectedBlogTypes = blogTypes;
      state.currentBlog = action.payload.length > 0 ? action.payload[0] : null;
      state.isLoaded = true;
    },
    modifyTypes(state, action) {
      const index = state.selectedBlogTypes.indexOf(action.payload);
      index === -1 ? state.selectedBlogTypes.push(action.payload) : state.selectedBlogTypes.splice(index, 1);
      state.filteredBlogData = filterData(state.blogData, state.selectedBlogTypes, state.searchTerm);
      state.currentBlog = state.filteredBlogData.length > 0 ? state.filteredBlogData[0] : null;
    },
    modifyCurrentBlog(state, action) {
      state.currentBlog = { ...action.payload };
    },
    modifySearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.filteredBlogData = filterData(state.blogData, state.selectedBlogTypes, state.searchTerm);
      state.currentBlog = state.filteredBlogData.length > 0 ? state.filteredBlogData[0] : null;
    },
    addNewBlog(state, action) {
      const newBlog = { ...action.payload };
      const newBlogType = newBlog.type.toLowerCase();
      state.blogData = [newBlog, ...state.blogData];
      state.currentBlog = { ...newBlog };
      !state.blogTypes.includes(newBlogType) && state.blogTypes.push(newBlogType);
      !state.selectedBlogTypes.includes(newBlogType) && state.selectedBlogTypes.push(newBlogType);
      state.filteredBlogData = filterData(state.blogData, state.selectedBlogTypes, state.searchTerm);
    },
    modifyEditStatus: (state, action) => {
      state.isEditing = action.payload;
    },
    editExistingBlog: (state, action) => {
      const blogData = state.blogData.filter((blog) => blog.title !== state.currentBlog.title);
      const modifiedBlog = { ...state.currentBlog, ...action.payload };
      state.currentBlog = modifiedBlog;
      state.blogData = [modifiedBlog, ...blogData];
      state.filteredBlogData = filterData(state.blogData, state.selectedBlogTypes, state.searchTerm);
      state.isEditing = false;
    },
  },
});

export const blogActions = blogSlice.actions;
export default blogSlice;
