import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addUser, updateUser, deleteUser } from "./todoslice";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FiEdit, FiTrash2, FiPlus, FiX } from "react-icons/fi";

Modal.setAppElement("#root");

function Todo() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isSureModalOpen, setIsSureModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { todos, status, error } = useSelector((state) => state.todos);

  // Fetch todos on mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(addUser({ title, desc }))
      .unwrap()
      .then(() => {
        toast.success("Todo Added Successfully!");
        setTitle("");
        setDesc("");
      })
      .catch(() => {
        toast.error("Failed to add todo");
      });
  };

  const handleEditUser = (todo) => {
    setEditId(todo._id);
    setTitle(todo.title);
    setDesc(todo.desc);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = () => {
    dispatch(updateUser({ id: editId, title, desc })).then(() => {
      setIsEditModalOpen(false);
      setIsUpdateModalOpen(true);
      setEditId(null);
      setTitle("");
      setDesc("");
    });
  };

  const handleDeleteUser = (id) => {
    setDeleteId(id);
    setIsSureModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUser(deleteId)).then(() => {
      setIsSureModalOpen(false);
      setIsDeleteModalOpen(true);
      setEditId(null);
    });
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setTitle("");
    setDesc("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white p-6">
      <h1 className="text-4xl font-extrabold mb-8 tracking-wide">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Todo App
        </span>
      </h1>

      {/* Input Form */}
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-96 border border-gray-700">
        <input
          className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          value={title}
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          rows="3"
          value={desc}
          placeholder="Enter Description"
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        {editId ? (
          <button
            className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 text-white py-2 px-4 rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2"
            onClick={handleUpdateUser}
          >
            <FiEdit /> Save Changes
          </button>
        ) : (
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white py-2 px-4 rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2"
            onClick={handleAddUser}
          >
            <FiPlus /> Add Todo
          </button>
        )}
      </div>

      {/* Todo List */}
      <div className="mt-8 w-full max-w-2xl">
        <h3 className="text-2xl font-semibold text-center mb-6">Your Todos</h3>
        {status === "loading" && <p className="text-center">Loading...</p>}
        {status === "failed" && <p className="text-center text-red-400">{error}</p>}

        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="bg-white/10 p-5 rounded-xl shadow-lg border border-gray-700 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{todo.title}</span>
                <div className="flex gap-3">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg text-white shadow-md transition-all duration-300 flex items-center gap-1"
                    onClick={() => handleEditUser(todo)}
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white shadow-md transition-all duration-300 flex items-center gap-1"
                    onClick={() => handleDeleteUser(todo._id)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-300 mt-2 text-sm leading-relaxed">{todo.desc}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Stylish Modals */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-96 border border-gray-700"
        overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit Todo</h2>
          <button onClick={handleCancel} className="text-gray-400 hover:text-red-400">
            <FiX size={22} />
          </button>
        </div>
        <input
          className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
          rows="3"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            className="w-1/2 bg-green-600 hover:bg-green-700 py-2 rounded-lg"
            onClick={handleUpdateUser}
          >
            Save
          </button>
          <button
            className="w-1/2 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Delete, Update, Confirm modals follow same styling */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-80 border border-gray-700 text-center"
        overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">Todo Deleted!</h2>
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          OK
        </button>
      </Modal>

      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-80 border border-gray-700 text-center"
        overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">Todo Updated!</h2>
        <button
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
          onClick={() => setIsUpdateModalOpen(false)}
        >
          OK
        </button>
      </Modal>

      <Modal
        isOpen={isSureModalOpen}
        onRequestClose={() => setIsSureModalOpen(false)}
        className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-96 border border-gray-700 text-center"
        overlayClassName="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">
          Are you sure you want to delete?
        </h2>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
            onClick={handleConfirmDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
            onClick={() => setIsSureModalOpen(false)}
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Todo;
