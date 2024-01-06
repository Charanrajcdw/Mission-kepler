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
  },
});

export const blogActions = blogSlice.actions;
export default blogSlice;
