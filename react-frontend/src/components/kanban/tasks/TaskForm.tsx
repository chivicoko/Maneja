import { Button, TextareaAutosize, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Project, Task, User } from "../../../utils/types";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Import services
import { fetchTasks, fetchProjects, fetchUsers, addTask, updateTask } from '../../../services/services';

type TaskFormProps = {
    openModal: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
};

const TaskForm = ({ openModal, handleOpenModal, handleCloseModal }: TaskFormProps) => {
    const [fetchedTasks, setFetchedTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [project, setProject] = useState<string>("");  // Project state
    const [teamMembers, setTeamMembers] = useState<number[]>([]);  // Team members state
    const [priority, setPriority] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [substatus, setSubstatus] = useState<string>("");
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [availableTeamMembers, setAvailableTeamMembers] = useState<User[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const [tasksResponse, projectsResponse, usersResponse] = await Promise.all([
                    fetchTasks(),
                    fetchProjects(),
                    fetchUsers(),
                ]);

                setFetchedTasks(tasksResponse);
                setProjects(projectsResponse);  // Store the fetched projects
                setAvailableTeamMembers(usersResponse);  // Store the fetched users as team members
            } catch (e) {
                console.error(e);
            }
        };

        getData();
    }, []);

    // Reset form fields
    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPriority("");
        setStatus("");
        setSubstatus("");
        setDueDate(null);
        setProject("");
        setTeamMembers([]);
        setEditingId(null);
    };

    // Add Task
    const handleAddTask = async () => {
        if (!title || !description || !project || teamMembers.length === 0 || !dueDate) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const newTask: Omit<Task, "id"> = {
                title,
                description,
                project,
                team_members: teamMembers,
                priority,
                status,
                substatus,
                due_date: dueDate.toISOString(),
                created_at: new Date().toISOString(),
            };

            const response = await addTask(newTask);
            setFetchedTasks((prevState) => [...prevState, response]);  // Immediately reflect the new task
            handleCloseModal();
            resetForm();
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task. Please try again.");
        }
    };

    // Update Task
    const handleUpdateTask = async () => {
        if (title && description && project && teamMembers.length > 0 && dueDate && editingId !== null) {
            try {
                const updatedTask: Task = {
                    id: editingId,
                    title,
                    description,
                    project,
                    team_members: teamMembers,
                    priority,
                    status,
                    substatus,
                    due_date: dueDate?.toISOString(),  // Always ensure date conversion to string format
                    created_at: new Date().toISOString()
                };

                const response = await updateTask(editingId, updatedTask);
                setFetchedTasks((prevState) =>
                    prevState.map((task) =>
                        task.id === editingId ? response : task
                    )
                );  // Immediately reflect the updated task
                handleCloseModal();
                resetForm();
            } catch (error) {
                console.error("Error updating task:", error);
                alert("Failed to update task. Please try again.");
            }
        }
    };
    
    return (
        <Dialog open={openModal} onClose={handleCloseModal} fullWidth className="custom-scrollbar" >
            <DialogTitle>{editingId === null ? "Add Task" : "Update Task"}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextareaAutosize
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    minRows={4}
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded-md"
                />

                {/* Project Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Project</InputLabel>
                    <Select
                        label="Project"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                    >
                        {projects.map((proj) => (
                            <MenuItem key={proj.id} value={proj.id}>
                                {proj.name} {/* Display the project title instead of ID */}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Team Members Multi-Select */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Team Members</InputLabel>
                    <Select
                        label="Team Members"
                        multiple
                        value={teamMembers}
                        onChange={(e) => setTeamMembers(e.target.value as number[])} // Cast value to number[]
                        renderValue={(selected) =>
                        availableTeamMembers
                            .filter((member) => selected.includes(member.id))
                            .map((member) => member.full_name)
                            .join(', ')
                        }
                    >
                        {availableTeamMembers.map((member) => (
                        <MenuItem key={member.id} value={member.id}>
                            <div className="flex items-center gap-3">
                                <img src={member.avatar} alt={`${member.full_name}'s dp`} className="w-6 h-6 rounded-full" /> 
                                {member.full_name} ({member.email}) {/* Display the member's name instead of ID */}
                            </div>
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Priority Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Priority</InputLabel>
                    <Select
                        label="Priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </Select>
                </FormControl>

                {/* Status Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="To do">To do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Need Review">Need Review</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                    </Select>
                </FormControl>

                {/* Substatus Dropdown */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Substatus</InputLabel>
                    <Select
                        label="Substatus"
                        value={substatus}
                        onChange={(e) => setSubstatus(e.target.value)}
                    >
                        <MenuItem value="Not started">Not started</MenuItem>
                        <MenuItem value="In Research">In Research</MenuItem>
                        <MenuItem value="On Track">On Track</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>

                {/* Due Date Picker */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="Due Date"
                    value={dueDate} // Keep value as Dayjs type
                    onChange={(newValue) => setDueDate(newValue)} // No need to convert here
                    slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                    />
                </LocalizationProvider>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseModal} color="primary">Cancel</Button>

                {editingId === null ? (
                    <Button variant="contained" color="primary" onClick={handleAddTask}>
                        Add Task
                    </Button>
                ) : (
                    <Button variant="contained" color="secondary" onClick={handleUpdateTask}>
                        Update Task
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default TaskForm;
